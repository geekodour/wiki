---
id: ruby
title: Ruby
sidebar_label: Ruby
---

## To Read

- https://ruby-hacking-guide.github.io/
- https://stackoverflow.com/questions/21372649/what-is-the-difference-between-integer-and-fixnum
- https://weblog.rubyonrails.org/2016/10/8/this-week-in-rails-getting-ready-for-ruby-2-4/
- https://github.com/rubocop-hq/ruby-style-guide#no-character-literals
- https://medium.com/rubycademy/the-singleton-module-in-ruby-part-i-7a26de39319d
- https://www.youtube.com/watch?v=VBC-G6hahWA&t=1s
- http://rubylearning.com/satishtalim/writing_our_own_class_in_ruby.html
- https://web.stanford.edu/~ouster/cgi-bin/cs142-winter15/classEval.php
- http://rubylearning.com/satishtalim/more_on_strings.html
- http://www.railstips.org/blog/archives/2006/11/18/class-and-instance-variables-in-ruby/
- https://www.toptal.com/ruby/ruby-pattern-matching-tutorial
- https://www.youtube.com/watch?v=UogjRwGl7k0
- https://www.jimmycuadra.com/posts/self-in-ruby/
- https://blog.appsignal.com/2018/10/02/ruby-magic-class-level-instance-variables.html

## Variable and scope

### Variable

- Local variables (`[a-z] or _`)
- Global variable (`$/$apple`)
- Instance variable (`@/@apple`)
- Class variable (`@@/@@apple`)
- Constant (`[A-Z]/APPLE`), Variables that start with a capital letter are constants.
- `nil` and `self` are pseudo-variables

Class and instance variables are private , so getters and setters are necessary to access the variables outside the class. We can write our own getter and setters using `@` and `@@` but ruby provides some shortcuts for creation getter and setters of instance variables.

- `attr_accessor`: creates the setter and getter methods.
- `attr_reader`: create the getter method.
- `attr_writer`: create the setter method.

**If using rails**, it extends Ruby with both `mattr_accessor` (Module accessor) and `cattr_accessor` (as well as `_reader`/`_writer` versions) to provide getter/setter [methods at the class or module level.](https://stackoverflow.com/questions/185573/what-is-mattr-accessor-in-a-rails-module)

There is another thing called `class level instance variable` which is **not** a class variable.

```ruby
# class level instance variable "things"
class Parent
  @things = []

  class << self
    attr_accessor :things
  end
end

Parent.things #=> []
Parent.things << :car
Parent.things #=> [:car]
```

#### Inheritance with variables

- Instance variables are not inherited.
- Class is also an object in ruby. So a class can have instance variables. A class instance variable is not shared by the class's descendants. (DOUBT: I think i mixed up some shit here.)
- A class variable is shared among the class and all of its descendants.

And then classes have the `initilize` method which we can use to initilize stuff.

### Scope

Scope refers to what variables are available at any given point in time.

## OOP

> class names tend to be nouns, whereas module names are often adjectives (Stack versus Stacklike). 
>
> https://stackoverflow.com/questions/1282864/ruby-inheritance-vs-mixins

It seems like in ruby objects(**internally**) can't have methods, only classes can. But in practice objects can have methods thaat are implemented by the **singelton** (`*`) superclass (sometimes called object's `metaclass` or `eigenclass`). `RObject`, `RClass` are the internal representation in the [MRI](https://en.wikipedia.org/wiki/Ruby_%28programming_language%29#Implementations)/[YARV](https://en.wikipedia.org/wiki/YARV) but not all objects(eg. `String`) fall into these two classes, they can have their own separate internal representation of [what the class looks like](https://www.youtube.com/watch?v=by5fFOBhtPQ).

```ruby
# 3 kinds of ways we get to see methods in Ruby
class SayHello
  def self.from_the_class # class method
    "Hello, from a class method"
  end

  def from_an_instance
    "Hello, from an instance method"
    # note: name of a instance method and class method can be same!
  end
end

hello1 = SayHello.new
hello2 = SayHello.new
hello1.from_an_instance # instance method

# method on specific objects
def hello1.poop
    "cool"
end
hello1.poop
hello2.poop # error!
hello1.from_the_class #error!
```

![](/img/ruby_class_methods.png)
_How class methods are implemented, `prural_name` is a class method here_

### Modules

Defined as a collection of methods and constants. The superclass of `Class` is `Module`. When using modules, we use the scope resolution operator `::` to access stuff inside it. The methods in a Module are only accessible if it is being **included** in a class. This including is sometime called **mixin**, so a module sometimes might be called in mixin.

Instead of using `include` we could also `extend` which does different stuff. If we use `extend`, ruby puts the methods from the module to the singleton class of that extending Class, i.e they get added as class methods. We can use `extend` on objects aswell, then they'll be added to the singleton class of the object.

If multiple classes include that module, they'll all point to the same thing.

```ruby
module MyModule
  def self.some_method # a module method
    p "Hello, from a class method"
  end
end
```

![](/img/ruby_module_includ.png)
_How inclusion of Modules happen (instance methods). Module methods are are not accessible when included in Classes._

> **Aside about `::` and `.`**
>
> - The `.` operator basically says "send this message to the object". When you write `obj.meth`, you're sending the `meth` message to the object `obj`. `obj` will respond to `meth` if there is a method body defined for it.
> - The `::` operator "drills down" to the scope defined to the left of the operator, and then calls the member defined on the right side of operator, it can help in accessing additional things such as constants in classes.
> - There is **no** difference between `::` and `.` when calling class (static) methods in functionality.
> - `::ClassNameCool::ClassNameBool` : absolute, gives access to top level from any context
> - `ClassNameCool::ClassNameBool` : relative

## Metaprogramming Ideas

### Contexts

There are three implicit contexts in Ruby: `self`, the scope [used for constant lookup](https://cirw.in/blog/constant-lookup.html), and lastly the [`default definee`](https://stackoverflow.com/questions/39453741/ruby-what-class-gets-a-method-when-there-is-no-explicit-receiver).

> **Execution Context**
>
> The execution context contains the variables, the methods and `self` for a given scope.

More on this:

- [Context Binding in Ruby](https://medium.com/rubycademy/context-binding-in-ruby-fa118ea62269)

##### `self`

This is the current object and the default receiver.

### Evals

More on this:

- https://rubymonk.com/learning/books/5-metaprogramming-ruby-ascent/chapters/24-eval/lessons/63-eval
- https://medium.com/rubycademy/ruby-class-eval-vs-module-eval-6c3cc24a070
- https://mauricio.github.io/2009/06/04/understanding-class_eval-module_eval-and-instance_eval.html

#### `class_eval` and `instance_eval`

A class name is simply a constant which points to an instance of the class `Class`.

- These methods allow us to evaluate arbitrary code in the context of a particular class or object. The names are confusing doe. These make use of the singleton class and not actually modifying the specified class directly.
- `class_eval`: creates **instance method** and belongs to the `Module` class, meaning that the receiver will be a module or a class.
- `instance_eval`: creates **class method** and belongs to the `Object` class, meaning that the receiver will be an object. (But also works when reciever is a class (??))

## Debugging Methods

```ruby
# respond_to
"hello".respond_to(:length)
# printing
puts
print
p
# function call
2.6.5 :006 > defined?(x)
 => "local-variable"
2.6.5 :007 > defined? x
 => "local-variable"
# include
array.include?(1)
```

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

```ruby
# symbol-tp-proc
user = {"name" => "Hrihsikesh","age" => 23}
user.keys.map{|key| key.object_id}
# same as above
user.keys.map do |key|
  key.object_id
end
# the & converts a symbol to a proc object which can be passed to methods (??)
user.keys.map(&:object_id)
```

Read More:

- Blocks can be converted into a 'proc' object
- https://borgs.cybrilla.com/tils/symbol-to-proc-in-ruby/
- https://www.rubyguides.com/2018/10/ruby-map-method/
- https://stackoverflow.com/questions/9468564/what-does-post-all-mapid-mean
- https://stackoverflow.com/questions/27329256/what-is-the-difference-between-a-method-and-a-proc-object
- https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/

## Blocks, Procs, Lambdas and Closures

- **Blocks** are essentially nameless functions. `yield` is used to call a block inside functions. We use `&arg_name_here` when we want to convert a `block` to a `proc`.
- **Procs** essentially an block which is an object and can be passed around and used as a block. In ruby you can only pass a **single block** but you can pass **multiple procs** around in functions. (`Proc.new` can be used and `<ProcObj>.call` method can be used to call it explitcitly).
  > `Proc.new` and `proc` are alias syntax
- **lamdas** These are like proc objects only, but has more things to offer.
  - One thing is picky about the arguments, you must pass the arguments to `.call`.
  - `procs` return from the context where they are defined.
  - `lambdas` return inside the function where `.call` was called from.
- **closures**: What's interesting about closures in ruby is that the value is not stored in the closure but the reference, so if we mutate the reference to a thing that is inside the closure, we can see updated value upon subsequent access to the closure.

## Exception and errors

- All Ruby exceptions and errors are an extension of the `Exception` class
- In a nutshell, every custom Ruby exception should extend `StandardError`, rather than the `Exception` class(ctrl+c).

## Misc

### Boolean Methods

These are methods that end with a `?`, The question mark is a valid character at the end of a method name. They are also called predicates, query. It's just a convention and there are various examples in the ruby language, `any?`,`is_a?`,`tainted?`,`nil?` etc. But `defined?` does not return a bool but still uses `?`

There is another place where `?` is used to define a character literal (which [is a discouraged style](https://github.com/rubocop-hq/ruby-style-guide/issues/631))

### Destruction

By convention, if a method name ends with an exclamation mark, it does something destructive
Eg. `reverse!`

### `class << foo` block

Idk what this is, the `<<` is the append operator

### hash rockets

`=>`

### spaceship operator

`a <=> b`

### Ruby’s % Notation

The parenthesis can be almost any other character such as square brackets `%w[...]`, curly braces `%w{...}` or even something like exclamation marks `%w!...!`. All of these have the same behavior (returning an array).

```ruby
%q[ ] # Non-interpolated String (except for \\ \[ and \])
%Q[ ] # Interpolated String (default)
%r[ ] # Interpolated Regexp (flags can appear after the closing delimiter)
%i[ ] # Non-interpolated Array of symbols, separated by whitespace
%I[ ] # Interpolated Array of symbols, separated by whitespace
%w[ ] # Non-interpolated Array of words, separated by whitespace
%W[ ] # Interpolated Array of words, separated by whitespace
%x[ ] # Interpolated shell command
```

Other [string notations.](https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Literals#The_.25_Notation)

### Eager Loading in Active Records

There are like 3 ways, `preload`, `eager_load` and there's a third one.

```ruby
# without any preloading
posts = Post.published.limit(100)
# preloading
posts = Post.published.preload(:tags).limit(100)
# querying on the relationship that was preloaded
posts = Post.published.preload(:tags).where(tags:{name: "Rails"}).limit(100)
# eager_loading
posts = Post.published.eager_load(:tags).limit(100)
# querying on the relationship that was eager_loaded
posts = Post.published.eager_load(:tags).where(tags:{name: "Rails"}).limit(100)
# use include to automatically select one between eager_load or preload
posts = Post.published.includes(:tags).limit(100)
=begin
performance of preload vs eager_load is roughly similar,
but includes chooses eager_loading when querying on the loaded relationship.
=end
```

### Kernel Module

- https://codequizzes.wordpress.com/2014/04/22/rubys-kernel-module/
- https://stackoverflow.com/questions/38289634/why-does-the-ruby-module-kernel-exist

### The ||= thing

```ruby
a ||= b # this behaves like a || a = b and NOT like a = a||b
```

### Musings

-  In ruby you can have an Array as the Key of a Hash object.
- I think nice way [to think about modules and interfaces in Ruby](https://stackoverflow.com/questions/19379145/ruby-yard-documenting-abstract-methods-implementations)
- programmatically check if an object will respond to a method call (or any message for that matter) from whatever calls the method, using `#respond_to?(:some_method)`
- This is possible because Rails implements an autoload system. It uses Module.const_missing to detect when you try to reference a constant that hasn't been loaded. It then loads the files it believes should contain the constant. This works most of the time, but there's a catch.
- The creator of ruby worked for Heroku, hence so many things ruby is related to Heroku. And DHH we all know.
- Plain Old Ruby Objects (POROs) LOLOL.
- [Rails autoloading — how it works, and when it doesn't](https://www.urbanautomaton.com/blog/2013/08/27/rails-autoloading-hell/#fn1)
- Note: Zeitwerk relies on the convention that each file will define the constant that is named after the name of the file (meaning that /comment.rb should define theComment constant). Luckily, this is not surprising for a normal Rails app. So `Constants` not only mean the constants we're familiar with.
- [**Reopening a class**](http://juixe.com/techknow/index.php/2007/01/17/reopening-ruby-classes-2/)

## Doubts

```ruby
# Running via Spring preloader in process 78235
# Loading development environment (Rails 6.0.3.2)
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

```ruby
# what?
# rails help commands
# Running via Spring preloader in process 259763
```

```ruby
# what the hell is this behaviour with strings?
2.6.5 :006 > a="asjhdjasdh"
 => "asjhdjasdh" 
2.6.5 :007 > a["asj"]
 => "asj" 
```

## Snippets

```ruby
# printing in rspec
STDOUT.puts
#
```

![](/img/2020-08/ruby-sys.png)

## Links

- https://www.zenspider.com/ruby/quickref.html#types
- https://www.johnnunemaker.com/rails-following-and-notifications/
