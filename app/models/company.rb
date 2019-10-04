class Company < ApplicationRecord
    has_many :transactions,
    primary_key: :id,
    foreign_key: :company_id,
    class_name: :Transaction

end
