import { dataRefs } from "../Fr-Texts/GlobalTexts"

export const titlesDashboard = [
    { title: dataRefs.companies_Title },
    { title: dataRefs.joboffers_Title },
    { title: dataRefs.sectoroffers_Title },
    { title: dataRefs.lastoffers_Title },
]

export const statGlobalCards = [
    {
        title: dataRefs.turnover_Text,
        grad: true,
        text1: dataRefs.perYear,
        text2: dataRefs.sincelastYear,
        data: dataRefs.turnover_Key,
    },
    {
        title: dataRefs.recrutementAverage_Text,
        grad: true,
        text1: " Jours",
        text2: dataRefs.sincelastsixMonth,
        data: dataRefs.recrutementAverage_Key,
    },
    {
        title: dataRefs.averagecost_Text,
        grad: true,
        text1: " Temps",
        text2: dataRefs.sincelastsixMonth,
        data: dataRefs.averagecost_Key
    },
    {
        title: dataRefs.mediansalairy_Text,
        grad: false,
        text1: dataRefs.perMonth,
        data: dataRefs.mediansalairy_Key
    },
]
