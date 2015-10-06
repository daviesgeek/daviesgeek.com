module Jekyll

  require 'slugify'

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')

      self.data['tag'] = tag
      self.data['title'] = "#{tag['name']}"

    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)

      tags = {}

      site.posts.each do |post|
        if post.categories.include?('archive')
          next
        end

        post.tags.each do |tag|

          slug = tag.slugify(true)

          if !tags[slug]
            tags[slug] = {}
            tags[slug]["posts"] = []
            tags[slug]["url"] = slug
            tags[slug]["name"] = tag
          end

          summaryPost = {}
          summaryPost["title"] = post.title
          summaryPost["url"] = post.url

          tags[slug]["posts"] << summaryPost
        end
      end

      tags.each do |slug, tag|
        site.pages << TagPage.new(site, site.source, File.join('tags', tag['url']), tag)
      end

    end

  end

end
