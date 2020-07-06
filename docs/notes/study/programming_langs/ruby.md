---
id: ruby
title: Ruby
sidebar_label: Ruby
---

## Symbols

```ruby
2.6.5 :022 > "x".object_id
 => 70256472841480
2.6.5 :023 > "x".object_id
 => 70256472836620
2.6.5 :024 > :x.object_id
 => 771548
2.6.5 :025 > :x.object_id
 => 771548
```

```ruby
# ruby added some syntactic sugar to hash creation
# but it still creates hashes with symbols, eg. querying we need to use symbols
2.6.5 :032 > aab = {user: "Debanga", age: 23}
 => {:user=>"Debanga", :age=>23}
2.6.5 :033 > aab
 => {:user=>"Debanga", :age=>23}
2.6.5 :034 > aab[user]
Traceback (most recent call last):
        1: from (irb):34
NameError (undefined local variable or method `user' for main:Object)
Did you mean?  super
2.6.5 :035 > aab[:user]
 => "Debanga"
2.6.5 :036 >
```

## Doubts

```ruby
user = {"name" => "Hrihsikesh","age" => 23}
user.keys.map(&:object_id)
```

- https://www.rubyguides.com/2018/10/ruby-map-method/
- https://stackoverflow.com/questions/9468564/what-does-post-all-mapid-mean
- https://stackoverflow.com/questions/27329256/what-is-the-difference-between-a-method-and-a-proc-object
- https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/

```ruby
Running via Spring preloader in process 78235
Loading development environment (Rails 6.0.3.2)
2.6.5 :001 > Symbol.all_symbols.size
 => 25894
2.6.5 :002 > a=2
 => 2
2.6.5 :003 > Symbol.all_symbols.size
 => 25894
2.6.5 :004 > a_boom=22
 => 22
2.6.5 :005 > Symbol.all_symbols.size
 => 25895
2.6.5 :006 >
```

```ruby
2.6.5 :004 > Symbol.all_symbols.include?(:popmaster)
 => true
2.6.5 :005 >
```
