class Api::CompaniesController < ApplicationController
    def index
        # @companies = current_user.companies
        @companies = Company.all
        render :index
    end 
    
    def show
    end

end