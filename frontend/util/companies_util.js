export const allCompanies = () => {
    return $.ajax({
        method: "GET",
        url: "/api/companies"
    })
}