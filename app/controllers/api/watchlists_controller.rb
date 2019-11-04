class Api::WatchlistsController < ApplicationController


def index
    @companies = current_user.watched_companies
    # debuggthis,er
    render '/api/companies/index'
end 


def create

    @watchlist_item = Watchlist.new(watchlist_params)

    if @watchlist_item.save 
        @company = Company.find(@watchlist_item.company_id)
    
        render '/api/watchlists/show'
    else
        render ["not a valid watchlist"], status: 406    
    end 
end

def destroy

    @watchlist_item = Watchlist.where(["user_id = ? and company_id = ?", current_user.id, params[:id].to_i])

    @watchlist_item.first.destroy
    @company = Company.find(params[:id])

    render '/api/watchlists/show'
end


private 

def watchlist_params
    params.require(:watchlist).permit(:user_id, :company_id)
end

end
