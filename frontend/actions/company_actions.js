import * as CompaniesAPIUtil from "../util/companies_util";
export const RECEIVE_COMPANIES = "RECEIVE_COMPANIES"


const receiveCompanies = companies => {
    return {
        type: RECEIVE_COMPANIES,
        companies
    }
}




export const allCompanies = () => dispatch => {
    return CompaniesAPIUtil.allCompanies()
        .then(companies => dispatch(receiveCompanies(companies)));
}






