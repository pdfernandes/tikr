class SearchController < ApplicationController

    def index 
        @companies = Company.where("name LIKE ? OR ticker LIKE ?", "#{search_params}%".upcase, "#{search_params}%".upcase)
        debugger
        render '/api/search/index'
    end


    private

    def search_params
        params.require(:search)
    end

end