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
        hasArrow: true,
        text1: dataRefs.perYear,
        text2: dataRefs.sincelastYear,
        data: dataRefs.turnover_Key,
    },
    {
        title: dataRefs.recrutementAverage_Text,
        hasArrow: true,
        text1: dataRefs.inDays,
        text2: dataRefs.sincelastsixMonth,
        data: dataRefs.recrutementAverage_Key,
    },
    {
        title: dataRefs.averagecost_Text,
        hasArrow: true,
        text1: dataRefs.inTime,
        text2: dataRefs.sincelastsixMonth,
        data: dataRefs.averagecost_Key
    },
    {
        title: dataRefs.mediansalairy_Text,
        text1: dataRefs.perMonth,
        data: dataRefs.mediansalairy_Key
    },
]

export const companyDashboardLottiesCard = [

    {
        title: dataRefs.companiesLottiesEmployees,
        data: dataRefs.companiesLottiesEmployees_Key,
        icon: dataRefs.employeesNumberIcon,
        up: true,
    },
    {
        title: dataRefs.companiesLottiesMale,
        data: dataRefs.companiesLottiesMale_Key,
        icon: dataRefs.maleAnimatedIcon,
        up: true,
    },
    {
        title: dataRefs.companiesLottiesFemale,
        data: dataRefs.companiesLottiesFemale_Key,
        icon: dataRefs.femaleAnimatedIcon,
        up: true,
    },
    {
        title: dataRefs.companiesLottiesCDI,
        data: dataRefs.companiesLottiesCDI_Key,
        icon: dataRefs.numberCDIIcon
    },
    {
        title: dataRefs.companiesLottiesCDD,
        data: dataRefs.companiesLottiesCDD_Key,
        icon: dataRefs.numberCDDIcon
    },
    {
        title: dataRefs.companiesLottiesOther,
        data: dataRefs.companiesLottiesOther_Key,
        icon: dataRefs.otherContractIcon
    },
]