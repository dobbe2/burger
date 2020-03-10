##Schema

drop database if EXISTS burgers_db;

create DATABASE burgers_db;

use burgers_db;

create table burgers (
    id integer not null auto_increment,
    primary key (id),
    burger_name varchar(80),
    devoured boolean
);