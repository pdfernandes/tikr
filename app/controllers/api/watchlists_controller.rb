class Api::WatchlistsController < ApplicationController


def index
    @companies = current_user.watched_companies
    # debuggthis,er
    render '/api/companies/index'
end 


def create
    debugger
    @watchlist_item = Watchlist.new(watchlist_params)
    debugger
    if @watchlist_item.save 
        @company = Company.find(@watchlist_item.company_id)
        debugger
        render '/api/watchlists/show'
    else
        render ["not a valid watchlist"], status: 406    
    end 
end

def destroy
    debugger
    @watchlist_item = Watchlist.find_by(params[:company_id])
    @watchlist_item.destroy
    @company = Company.find(@watchlist_item.company_id)
    debugger
    render '/api/watchlists/show'
end


private 

def watchlist_params
    params.require(:watchlist).permit(:user_id, :company_id)
end

end
