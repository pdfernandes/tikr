class WatchlistController < ApplicationController


def index
    @\companies = current_user.watched_companies
    render '/api/companies/index'
end 


def create
    @watchlist_item = Watchlist.new(watchlist_params)
    if @watchlist_item.save 
        render ["success"], status: 200
    else
        render ["not a valid watchlist"], status: 406    
    end 
end

def destroy
    @watchlist_item = Watchlist.find(params[:id])
    @watchlist.destroy
    render json: ["successful"], status: 200
end


private 

def watchlist_params
    params.require(:watchlist).permit(:user_id, :company_id)
end

end
