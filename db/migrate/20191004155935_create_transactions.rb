class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.boolean :order_type, null: false
      t.integer :quantity, null: false
      t.integer :company_id, null: false
      t.integer :user_id, null: false
      t.decimal :price, null: false
      

      t.timestamps
    end
  end
end
