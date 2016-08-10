insert into users (first_name, last_name, tag_id, email, password_digest)
 VALUES
  ('Michael', 'Werbowsky', '4F0040968A', "mwerbo2@gmail.com", "test"),
  ('Arlen', 'Cho', '01005A6602', "a@gmail.com", "test"),
    ('Luis', 'Lithgow', '010059F3E2', "l@gmail.com", "test")
 ;


 insert into permissions (item_name, owner_id, item_description, has_permission)
  VALUES
  ('Snack Drawer', 1, 'Keeping snacks secure', 1),
  ('Laundry room', 2, 'Preventing stray laundry users', 3),
  ('Server Room', 3, 'Keep data secure', 2)
  ;

  insert into tasks (task_name, task_description, assigned_to, deadline, completed)
  VALUES
  ('Clean Bathroom', 'Mop floors and bleach showers', 2, '9/01/16', false),
  ('Clean Living Room', 'Dust shelves, sweep under couch', 3, '8/27/16', false),
  ('Organize Closet', 'Shoes, umbrellas and hats', 1, '7/8/16', true)
  ;
