<?php

namespace App\Http\Controllers\Stok\KartlarVeReceteler\StokTanitimKartlari;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StokTanitimKartiController extends Controller
{
    private $remoteDb;
    
    public function __construct()
    {
        $this->remoteDb = getRemoteDb();    
    }

    public function index() {

        $sql = "
            SELECT
            sto_Guid as id,
            sto_kod as code,
            sto_isim as name,
            sto_kisa_ismi,
            $this->remoteDb.dbo.fn_StokCins(sto_cins) as type,
            sfiyat_fiyati,
            sto_birim1_ad as unit_name,
            sto_yer_kod as shelf_code,
            $this->remoteDb.dbo.fn_AnaGrupIsmi(sto_anagrup_kod) as ana_group, 
            $this->remoteDb.dbo.fn_AltGrupIsmi(sto_anagrup_kod,sto_altgrup_kod) as alt_group,
            sto_create_date as create_date,
            dbo.fn_DovizIsmi(sto_doviz_cinsi) as doviz
            from $this->remoteDb.dbo.STOKLAR
            LEFT JOIN $this->remoteDb.dbo.STOK_SATIS_FIYAT_LISTELERI on sfiyat_stokkod=sto_kod and sfiyat_listesirano=1 and sfiyat_deposirano=0 and sfiyat_birim_pntr=1
            order by sto_create_date desc
        ";

        $data = getQuery($sql);

        return $data;
    }
}
