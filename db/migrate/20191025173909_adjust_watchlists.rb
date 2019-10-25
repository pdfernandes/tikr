class AdjustWatchlists < ActiveRecord::Migration[5.2]
  def change
      add_column :watchlists, :user_id, :integer
      change_column_null :watchlists, :user_id, false
      add_column :watchlists, :company_id, :integer
      change_column_null :watchlists, :company_id, false
      add_index :watchlists, [:user_id, :company_id]
  end
end
