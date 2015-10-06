module Jekyll

  require 'slugify'

  class TagIndexPage < Page
    def initialize(site, base, dir, tags)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag-index.html')

      self.data['tags'] = tags
      self.data['title'] = "Tags"

    end
  end

  class TagIndexPageGenerator < Generator
    safe true

    def generate(site)

      tags = {}

      site.posts.each do |post|
        if post.categories.include?('archive')
          next
        end

        post.tags.each do |tag|

          slug = tag.slugify(true)

          if tags[slug]
            next
          end

          summaryTag = {}
          summaryTag['name'] = tag
          summaryTag['url'] = "/#{site.config['tag_path']}/#{slug}"

          tags[slug] = summaryTag
        end
      end

      tagsArray = []

      tags.each do |slug,tag|
        tagsArray << tag
      end

      sorted = tagsArray.sort_by! { |t |t["name"] }

      site.pages << TagIndexPage.new(site, site.source, 'tags', sorted)

    end

  end

end
