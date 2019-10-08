class Api::CompaniesController < ApplicationController
    def index
        if current_user
            @companies = current_user.companies 
        else 
            @companies = Company.all
        end
        render :index
    end 
    
    def show
        @company = Company.find(params[:id])
        render :show
    end

end