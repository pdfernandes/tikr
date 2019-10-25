# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#  company_id :integer          not null
#

class Watchlist < ApplicationRecord
    validates_uniqueness_of :user_id, scope: [:company_id]
    

end

