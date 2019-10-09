import * as CompaniesAPIUtil from "../util/companies_util";
export const RECEIVE_COMPANIES = "RECEIVE_COMPANIES";
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';


const receiveCompanies = companies => {
    return {
        type: RECEIVE_COMPANIES,
        companies
    }
}

const receiveCompany = company => {
    return {
        type: RECEIVE_COMPANY,
        company
    }
}




export const allCompanies = () => dispatch => {
    return CompaniesAPIUtil.allCompanies()
        .then(companies => dispatch(receiveCompanies(companies)));
}

export const getCompany = (ticker) => dispatch => {
    return CompaniesAPIUtil.getCompany(ticker)
    .then(company => dispatch(receiveCompany(company)))
}



export const allUserCompanies = id => dispatch => {
    return CompaniesAPIUtil.allUserCompanies(id)
        .then(companies => dispatch(receiveCompanies(companies)));
}




