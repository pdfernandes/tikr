export const searchDB = search => {
    return $.ajax({
        method: "GET",
        url: '/search/companies',
        data: {
            search
        }
    })
}