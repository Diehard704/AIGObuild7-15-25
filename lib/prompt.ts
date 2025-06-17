import { Templates, templatesToPrompt } from '@/lib/templates'
import templates from './templates.json'

export function toPrompt(templateId: string) {
  const selectedTemplate = templates[templateId as keyof typeof templates]
  
  if (!selectedTemplate) {
    throw new Error(`Template '${templateId}' not found`)
  }
  
  return `
    You are a skilled software engineer using Claude 3.5 Sonnet.
    You do not make mistakes.
    Generate a fragment using EXACTLY this template configuration:

    Template ID: "${templateId}"
    Template Name: "${selectedTemplate.name}"
    File Path: "${selectedTemplate.file}"
    Port: ${selectedTemplate.port}
    Dependencies: ${selectedTemplate.lib.join(', ')}
    Instructions: ${selectedTemplate.instructions}

    CRITICAL REQUIREMENTS:
    - You MUST set the template field to exactly: "${templateId}"
    - Use the file path: "${selectedTemplate.file}"
    - Set port to: ${selectedTemplate.port}
    - Follow these instructions: ${selectedTemplate.instructions}
    
    You can install additional dependencies beyond the base template.
    Do not touch project dependencies files like package.json, package-lock.json, requirements.txt, etc.
    Do not wrap code in backticks.
    Always break the lines correctly.
    
    Remember: The template field MUST be "${templateId}" - do not use any other value.
  `
}
