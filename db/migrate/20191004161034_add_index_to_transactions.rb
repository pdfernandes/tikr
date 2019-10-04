class AddIndexToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_index :transactions, :user_id
    add_index :transactions, :company_id
  end
end
