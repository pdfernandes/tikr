class AddTransactionTimeToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :transaction_time, :string
  end
end
