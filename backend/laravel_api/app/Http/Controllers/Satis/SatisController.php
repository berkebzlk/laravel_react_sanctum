<?php

namespace App\Http\Controllers\Satis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SatisController extends Controller
{

    private $remoteDb;

    public function __construct()
    {
        $this->remoteDb = getRemoteDb();
    }

    public function satisKontrolAnaliz () {
        $sql = "
            SELECT 
            $this->remoteDb.dbo.fn_CarininısminiBul(0,cha_ciro_cari_kodu) as CariAdi,
            cha_evrakno_seri+''+cast(cha_evrakno_sira as varchar) as EvrakNo,
            CONVERT(VARCHAR,cha_tarihi,104) as FaturaTarihi,
            hg2_isim as UlkePRojeKodu,
            hg3_isim as AltProjeKodu,
            cha_projekodu as SatisProjeKodu,
            $this->remoteDb.dbo.fn_DovizIsmi(cha_d_cins) as FaturaParaBirimi,
            cha_d_kur as FaturaKurBilgisi,
            CHA_VERGI_TOPLAM*cha_d_kur  AS VergiTutari,
            CHA_CARI_MEBLAG_ANA as FaturaTutarı,
            hg1_isim as IsSahibi
            from $this->remoteDb.dbo.CARI_HESAP_HAREKETLERI_FULL_VIEW
            left outer join $this->remoteDb.dbo.HAREKET_GRUBU_1 on hg1_kod=cha_HareketGrupKodu1
            left outer join $this->remoteDb.dbo.HAREKET_GRUBU_2 on hg2_kod=cha_HareketGrupKodu2
            left outer join $this->remoteDb.dbo.HAREKET_GRUBU_3 on hg3_kod=cha_HareketGrupKodu3
            where CHEvrKisaIsim='Sat.fat'
            and (year(cha_tarihi)=year(GETDATE()) or year(cha_tarihi)=year(GETDATE())-1 or year(cha_tarihi)=year(GETDATE())-2)
        ";

        $data = getQuery($sql);

        return $data;
    }
}
