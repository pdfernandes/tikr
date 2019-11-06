class Api::CompaniesController < ApplicationController
    def index
        # if current_user
            # @companies = current_user.companies.uniq
        # else 
            @companies = Company.all
        # end
        render :index
    end 
    
    def show
        @company = Company.find(params[:ticker])
        render :show
    end

    def user_companies
        # refactor this to not make as many queries
        @checked_transactions = []
        @companies = []
        params[:transactions].each do |transaction|
            company_id = transaction[1]["company_id"]
            @checked_transactions << company_id if !@checked_transactions.include?(company_id)
            # @checked_tickers << Company.find(company_id)
        end
        @checked_transactions.each do |id|
            @companies << Company.find(id)
        end
        @companies
        render :user_companies
    end

end