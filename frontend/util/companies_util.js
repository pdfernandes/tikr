export const allCompanies = () => {
    return $.ajax({
        method: "GET",
        url: "/api/companies"
    })
}

export const getCompany = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `api/companies/${ticker}`
    })
}


export const allUserCompanies = transactions => {
    return $.ajax({
      method: "GET",
      url: `api/companies/user_companies`,
      data: {
        transactions
      }
    });
}



