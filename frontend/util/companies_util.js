export const allCompanies = () => {
    return $.ajax({
        method: "GET",
        url: "/api/companies"
    })
}

export const getCompany = (id) => {
    return $.ajax({
        method: "GET",
        url: `api/companies/${id}`
    })
}


export const allUserCompanies = id => {
    return $.ajax({
        method: "GET",
        url:`api/users/${id}/companies`
    })
}