# == Schema Information
#
# Table name: transactions
#
#  id               :bigint           not null, primary key
#  order_type       :boolean          not null
#  quantity         :integer          not null
#  company_id       :integer          not null
#  user_id          :integer          not null
#  price            :decimal(, )      not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  transaction_time :string
#

class Transaction < ApplicationRecord
    validates :user_id, :company_id, :quantity, :price, presence: true
    validates :order_type, inclusion: { in: [true, false] }

    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :company,
    primary_key: :id,
    foreign_key: :company_id,
    class_name: :Company
    


end
