class Api::CompaniesController < ApplicationController
    def index
        @companies = current_user.companies
        render :show
    end 
    
    def show
    end

end