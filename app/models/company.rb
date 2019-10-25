# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Company < ApplicationRecord
    has_many :transactions,
    primary_key: :id,
    foreign_key: :company_id,
    class_name: :Transaction


    has_many :watchlists,
    primary_key :id,
    foreign_key :company_id,
    class_name :Watchlist

    

end
