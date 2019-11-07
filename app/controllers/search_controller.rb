class SearchController < ApplicationController

    def index 
        @companies = Company.where("name LIKE ? OR ticker LIKE ?", "#{search_params}%".titleize, "#{search_params}%".upcase)
        render '/api/search/index'
    end


    private

    def search_params
        params.require(:search)
    end

end