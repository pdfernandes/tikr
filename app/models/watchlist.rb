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

    belongs_to :user,
    primary_key :id,
    foreign_key :user_id,
    class_name :User

    belongs_to :company,
    primary_key :id,
    foreign_key :company_id,
    class_name :Company
  



    # TODO add dependent destroy clauses for users

end

