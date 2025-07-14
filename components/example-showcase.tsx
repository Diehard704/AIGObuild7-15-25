'use client'

import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent } from '@/components/ui/m3-card'
import { Search, Filter, Eye, Edit3, Share2, Download } from 'lucide-react'

export function ExampleShowcase() {
  const exampleProjects = [
    {
      id: '1',
      title: 'Find Your Perfect Home',
      description: 'Real estate platform with advanced search and filtering',
      category: 'Real Estate',
      color: 'from-orange-500 to-red-500',
      views: 1247,
      likes: 89,
      status: 'published'
    },
    {
      id: '2',
      title: 'TaskFlow Pro',
      description: 'Advanced project management with team collaboration',
      category: 'Productivity',
      color: 'from-blue-500 to-purple-500',
      views: 892,
      likes: 156,
      status: 'published'
    },
    {
      id: '3',
      title: 'Weather Insights',
      description: 'Real-time weather data with interactive visualizations',
      category: 'Data Science',
      color: 'from-green-500 to-teal-500',
      views: 567,
      likes: 43,
      status: 'draft'
    }
  ]

  return (
    <div className="bg-surface-container rounded-t-3xl mt-16 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-4">
            My Fragments Workspace
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium bg-surface-container placeholder:text-muted-foreground"
              />
            </div>

            <select className="px-4 py-3 border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium bg-surface-container text-foreground">
              <option>Last edited</option>
              <option>Name A-Z</option>
              <option>Most viewed</option>
            </select>

            <select className="px-4 py-3 border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium bg-surface-container text-foreground">
              <option>All creators</option>
              <option>My projects</option>
              <option>Shared with me</option>
            </select>

            <M3Button
              variant="outlined"
              size="sm"
              className="group"
            >
              <Filter className="w-4 h-4 mr-2" />
              View All
              <Eye className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </M3Button>
          </div>
        </motion.div>

        {/* Example project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                <div className={`h-40 bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="relative z-10 text-center">
                    <div className="text-3xl mb-2">🏠</div>
                    <div className="m3-title-large font-semibold">{project.title}</div>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'published'
                        ? 'bg-success/20 text-success'
                        : 'bg-warning/20 text-warning'
                      }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <M3CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="m3-title-large font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="m3-body-medium text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {project.likes}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <M3Button variant="filled" size="sm" className="flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </M3Button>
                    <M3Button variant="outlined" size="sm">
                      <Download className="w-4 h-4" />
                    </M3Button>
                  </div>
                </M3CardContent>
              </M3Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
