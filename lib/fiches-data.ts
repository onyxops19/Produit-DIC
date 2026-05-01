export interface FichePDF {
  title: string;
  url: string;
  note?: string;
}

export interface FicheCategory {
  slug: string;
  title: string;
  fiches: FichePDF[];
  note?: string;
}

const BASE = "http://produits-idc.com/images";

export const ficheCategories: FicheCategory[] = [
  {
    slug: "attaches-generales",
    title: "Attaches générales",
    fiches: [
      { title: "FT Duro CL12-19-30351", url: `${BASE}/FTDuro-CL12-19-30351.pdf` },
      { title: "FT Duro CL18", url: `${BASE}/FTDuro-CL18-.pdf` },
      { title: "FT Duro CL23-19-30350", url: `${BASE}/FTDuro-CL23-19-30350.pdf` },
      { title: "FT Métaux Channel 6-497D", url: `${BASE}/FTMetaux-Channel-6-497D.pdf` },
      { title: "FT Strut Channel", url: `${BASE}/FTStrutChannel.pdf` },
      { title: "FT U-Channel", url: `${BASE}/FTU-channel.pdf` },
      { title: "Duro Manuel de Câblage (13 Mo)", url: `${BASE}/DuroManualdeCablage.pdf` },
      { title: "Duro Seismic Verification SMACNA", url: `${BASE}/DuroSeismicVerificationSMACNA.pdf` },
    ],
  },
  {
    slug: "canevas",
    title: "Canevas",
    fiches: [
      { title: "Duro Canevas All", url: `${BASE}/Duro-CanevasAll-.pdf` },
    ],
  },
  {
    slug: "damper",
    title: "Damper — Volet de Balancement",
    note: "Ces fiches techniques sont similaires aux produits que l'on fait fabriquer.",
    fiches: [
      { title: "FT Damper Multi Carré", url: `${BASE}/FTDamperMultiCarre.pdf` },
      { title: "FT Duro Zone SPRD-110-5", url: `${BASE}/FTDUROZONESPRD-110-5.pdf` },
    ],
  },
  {
    slug: "diffuseurs",
    title: "Diffuseurs",
    fiches: [
      { title: "FT Diffuseur 3 Cônes DF3 24×24", url: `${BASE}/zFTs-Diffuseur-2424-DF3.pdf` },
      { title: "SUB Diffuseur 3 Cônes DF3 24×24", url: `${BASE}/zSUB-Diffuseur-2424-DF3.pdf` },
      { title: "FT Diffuseur à Plaque ISOH 24×24", url: `${BASE}/zFT-Diffuseur-ISOH.pdf` },
      { title: "SUB Diffuseur à Plaque ISOH 24×24", url: `${BASE}/zSUB-Diffuseur-ISOH.pdf` },
      { title: "FT Plaster Frame PF 24×24", url: `${BASE}/zFT-Plaster-Frame-PF.pdf` },
    ],
  },
  {
    slug: "accessoires-chauffage",
    title: "Accessoires (Fitting) de chauffage",
    fiches: [
      { title: "FT Heto-STO", url: `${BASE}/FTHeto-STO.pdf` },
      { title: "FT STO-S", url: `${BASE}/FTSTO-S.pdf` },
    ],
  },
  {
    slug: "flexible",
    title: "Flexible",
    fiches: [
      { title: "FT API 4625", url: `${BASE}/FTAPI4625.pdf` },
      { title: "FT DAP (Lambro)", url: `${BASE}/FTDAP.pdf` },
      { title: "FT FAP (Lambro)", url: `${BASE}/FTFAP.pdf` },
      { title: "FT FCMI (Lambro)", url: `${BASE}/FTFCMI.pdf` },
      { title: "FT FIAC (Lambro)", url: `${BASE}/FTFIAC.pdf` },
      { title: "FT FIAP (Lambro)", url: `${BASE}/FTFIAP.pdf` },
      { title: "FT FIC (Lambro)", url: `${BASE}/FTFIC.pdf` },
      { title: "FT FIM (Lambro)", url: `${BASE}/FTFIM.pdf` },
      { title: "FT FMD (Lambro)", url: `${BASE}/FTFMD.pdf` },
      { title: "FT SIM3 (Lambro)", url: `${BASE}/FTSIM3.pdf` },
    ],
  },
  {
    slug: "gasket",
    title: "Gasket",
    fiches: [
      { title: "FT Gasket General Duro", url: `${BASE}/FTGasketGeneralDuro.pdf` },
      { title: "FT Guertin Coating T0185", url: `${BASE}/FTGuertinCoatingT0185.pdf` },
      { title: "FT H1C-B-1434", url: `${BASE}/FTH1C-B-1434.pdf` },
    ],
  },
  {
    slug: "laine",
    title: "Laine",
    fiches: [
      { title: "FT LINACOUSTIC RC (Johns Manville)", url: `${BASE}/FTLINACOUSTICRC.pdf` },
      { title: "FT OFI-40 (Johns Manville)", url: `${BASE}/FTOFI-40.pdf` },
      { title: "FT R-300 Permacote Linacoustic (Johns Manville)", url: `${BASE}/FTR-300PermacoteLinacoustic.pdf` },
      { title: "FT Akousti-Liner R en panneau (Manson)", url: `${BASE}/FTAkousti-LinerRenpanneau.pdf` },
      { title: "FT Akousti-Liner (Manson)", url: `${BASE}/FTAkousti-Liner.pdf` },
      { title: "FT FSK (Manson)", url: `${BASE}/FTFSK.pdf` },
      { title: "FT Laine Thermique (Manson)", url: `${BASE}/FTLaineThermique.pdf` },
      { title: "Document LEED Manson", url: `${BASE}/Leed_document_Manson.pdf` },
    ],
  },
  {
    slug: "porte-acces",
    title: "Porte Accès",
    fiches: [
      { title: "FT Porte Accès Ovale", url: `${BASE}/FTPAOvale.pdf` },
      { title: "FT Porte Accès", url: `${BASE}/FTPA.pdf` },
      { title: "FT Porte Accès Piano", url: `${BASE}/FTPA_PIANO.pdf` },
    ],
  },
  {
    slug: "quincaillerie",
    title: "Quincaillerie",
    fiches: [
      { title: "Beam Clamp Erico 3000037PL", url: `${BASE}/BeamClampErico-3000037PL.pdf` },
    ],
  },
  {
    slug: "silicone-butyl-scellant",
    title: "Silicone, Butyl & Scellant",
    fiches: [
      { title: "FT AIRSEAL 33", url: `${BASE}/FTAIRSEAL33.pdf` },
      { title: "FT Butyl Mulco", url: `${BASE}/FTButylMulco.pdf` },
      { title: "FT Elgen Duct Seal-It", url: `${BASE}/FTElgenDuctSeal-It.pdf` },
      { title: "FT Firebarrier Silicon", url: `${BASE}/FTFirebarrierSilicon.pdf` },
      { title: "FT Galvicon Gallon", url: `${BASE}/FTGalviconGallon.pdf` },
      { title: "FT Galvicon Spray", url: `${BASE}/FTGalviconspray.pdf` },
      { title: "FT Guertin 1085", url: `${BASE}/FTGUERTIN1085.pdf` },
      { title: "FT Mulco Supra", url: `${BASE}/FTMulcoSupra.pdf` },
      { title: "FT Papier Scellant Bleu", url: `${BASE}/FTPapierScelantBleu.pdf` },
      { title: "FT WB-S2", url: `${BASE}/FTWB-S2.pdf` },
      { title: "FT 4559 Fab Shop", url: `${BASE}/FT4559Fabshop.pdf` },
    ],
  },
  {
    slug: "tape",
    title: "Tape",
    fiches: [
      { title: "FT Mesh Tape Coton", url: `${BASE}/FTMeshTapeCoton.pdf` },
      { title: "FT Tape Aluminium TA-330X", url: `${BASE}/FTTapeAluminiumTA-330X-x.pdf` },
      { title: "FT Tesa 60756", url: `${BASE}/FTTesa60756.pdf` },
    ],
  },
  {
    slug: "divers",
    title: "Divers",
    fiches: [
      { title: "FT CP-52", url: `${BASE}/FTCP-52.pdf` },
      { title: "FT CP-135", url: `${BASE}/FTCP-135.pdf` },
      { title: "FT POLYPAD 4×4", url: `${BASE}/FTPOLYPAD_4x4.pdf` },
      { title: "FT Galvanisé G90", url: `${BASE}/FTGalvaniseG90.pdf` },
      { title: "FT Superseal Coating", url: `${BASE}/FTSUPERSEALCOATING.pdf` },
      { title: "FT WIT-43", url: `${BASE}/FTWITSpec.pdf` },
    ],
  },
];
