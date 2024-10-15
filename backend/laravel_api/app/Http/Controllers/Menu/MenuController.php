<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function index()
    {
        $sql = "
            WITH CTE AS (
            select menu_route.id,
            parent_id ,
            route_id,
            meta_id,
            menu_route.name ,
            cast(cast('/' + cast(menu_route.displayorder as varchar(255)) as varchar(255)) + '/' as varchar(255)) as hier,
            isnull(menu_activity.active,0) as active
            from menu_route
            inner join menu on menu.id = menu_route.menu_id and menu.is_delete = 0 and menu.is_passive = 0
            inner join [role] on [role].id = menu.role_id and [role].is_delete = 0 and [role].is_passive = 0
            inner join employee on employee.role_id = menu.role_id and employee.is_delete = 0 and employee.is_passive = 0
            outer apply(select top 1 menu_activity.active as active from menu_activity where menu_route_id=menu_route.id and [user_id]=employee.id) as menu_activity
            where menu_route.is_delete = 0 and menu_route.is_passive = 0
            and parent_id is NULL
            and employee.id = " . Auth::user()->id . "
            union all
            select menu_route.id,
            menu_route.parent_id,
            menu_route.route_id,
            menu_route.meta_id,
            menu_route.name,
            cast(replace(cast(cast(CTE.hier + '/' + cast(menu_route.displayorder  as varchar(255)) as varchar(255)) + '/' as varchar(255)),'//','/') as varchar(255)),
            isnull(menu_activity.active,0) as active
            from menu_route
            outer apply(select  menu_activity.active as active from menu_activity where menu_route_id=menu_route.id and [user_id]=" . Auth::user()->id . ") as menu_activity
            join CTE on CTE.id = menu_route.parent_id
            where menu_route.is_delete = 0 and menu_route.is_passive = 0
            and menu_route.parent_id is NOT NULL
            ), CTE2 AS(
            select id, parent_id, route_id ,meta_id, name, CAST(hier as hierarchyid) as hier,active
            from CTE
            )
            select CTE2.id,parent_id,meta_id,route.route,name,case when hasChield.ct > 0 then 1 else 0 end as hasChield,active
            from CTE2
            OUTER APPLY (select top(1) COUNT(*) as ct from CTE2 as c2 where c2.parent_id = CTE2.id) as hasChield
            left join route on Route.id = CTE2.route_id and route.is_delete = 0 and route.is_passive = 0
            order by hier
        ";

        $menu = DB::select($sql);

        return $this->buildTree($menu);

    }

    function buildTree(array $elements, $parentId = 0) {
        $branch = array();
        foreach ($elements as $element) {
            if ($element->parent_id == $parentId) {
                $children = $this->buildTree($elements, $element->id);
                if ($children) {
                    $element->children = $children;
                }
                $branch[] = $element;
            }
        }
        return $branch;
    }

}
