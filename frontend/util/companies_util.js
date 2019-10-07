export const allCompanies = () => {
    return $.ajax({
        method: "GET",
        url: "/api/companies"
    })
}


export const allUserCompanies = id => {
    return $.ajax({
        method: "GET",
        url:`api/users/${id}/companies`
    })
}