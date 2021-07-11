#
# Generate GS1 Products, ready for load into EVT
#
# Install:
#
#     brew install ruby
#     gem install nokogiri
#
# Run and generate 100 products:
#
#     ruby src/main/ruby/gen_products.rb 100 > products.xml
#

require 'csv'
require 'date'
require 'nokogiri'

# Colors

COLORS_CSV=File.join(File.dirname(__FILE__), "../../test/resources/codebrainz/colors.csv")

class String
  def trim_clarifiers()
    self.sub(/\s+\(\w+\)/,'')
  end
end

# Generate a seqence of colours
def color_generator
  names = CSV.read(COLORS_CSV, :headers=>true).map {|r| r['name']}
  names.map {|s| s.trim_clarifiers }.shuffle.to_a.cycle
end


# Generate an infinite sequence of EAN numbers
def ean_generator(prefix=500)
  Enumerator.new do |y|
    doy = Date.today.yday
    t = (DateTime.now.to_time.to_i % 86400) * 100
    #yr = DateTime.now.year.to_i % 10
    n=1
    loop do
      y << sprintf("%03d%03d%07d", prefix, doy, t + n)
      n=n+1
    end
  end
end

Sizes = ['S', 'M', 'L', 'XL'].cycle

Products = ['Beanie', 'Boots', 'Gloves', 'Scarf'].cycle

def product_generator
  Enumerator.new do |y|
    colors   = color_generator()
    eans     = ean_generator()
    products = Products
    sizes    = Sizes
    loop do
      color = colors.next
      product = products.next
      n = sprintf("%s %s (%s)", color, product, sizes.next)
      y << {name: n, ean: eans.next, product:product}
    end
  end
end

# Convert list of product maps to GS1 XML
def products_xml(products)
  @products = products
  builder = Nokogiri::XML::Builder.new { |xml|
    xml.Products('xmlns' => 'http://schema.org/Product') do
      @products.each { |product|
        xml.Product { |p|
          p.name        product[:name]
          p.description product[:name]
          p.gtin13      product[:ean]
          p.brand       'ACME'
          p.category    ['Apparel', product[:product]].join('/')
          p.image       'https://www.gs1.org/sites/all/themes/custom/gsone_phoenix_toolkit/images/GS1_Corporate_logo.png'
        }
      }
    end
  }
  return builder.to_xml  
end

# First argument to this program is number of records to generate
def product_count 
  ARGV.first.to_i
end

puts products_xml(product_generator().take(product_count))
