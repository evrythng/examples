#
# Generate GS1 Products, ready for load into EVT
#
# Install:
#
#     brew install ruby
#
#
# Run
#
#     ruby src/main/ruby/gen_products.rb > products.xml
#

require 'csv'
require 'date'

COLORS_CSV=File.join(File.dirname(__FILE__), "../../test/resources/codebrainz/colors.csv")

class Colors
  def initialize(f)
    @names = CSV.read(f, :headers=>true).map {|r| r['name']}
  end
  attr_reader :names
end

class EANGenerator
  def initialize(prefix=500)
    @prefix = prefix.to_i
    @doy = Date.today.yday
  end

  def generate(n=1)
    t = (DateTime.now.to_time.to_i % 86400) * 100
    y = DateTime.now.year.to_i % 10
    return (1..n).map { |n| sprintf("%03d%03d%07d", @prefix, @doy, t + n) }
  end

end

Sizes = ['S', 'M', 'L', 'XL']

#puts Colors.new(COLORS_CSV).names.last.inspect

#puts EANGenerator.new(500).generate(100)
