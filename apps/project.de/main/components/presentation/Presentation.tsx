/**
 * @copyright     © 2024 by J. Quader
 * @author        H. Nadir
 * @author        Dr. J. Quader
 */
import React, { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { de } from 'date-fns/locale'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import LogoFull from '../../assets/images/logo-full.png'
import FullwidthImage from '../../components/images/FullwidthImage'

const Presentation = ({ title, content, date }) => {
  const [slides, setSlides] = useState([])

  // Dynamically import and initialize Reveal.js
  useEffect(() => {
    let deckInstance: any = null

    import('reveal.js').then((Reveal) => {
      deckInstance = new Reveal.default({
        embedded: true,
        hash: true,
        margin: 0.1,
        minScale: 1,
        maxScale: 1
      })
      deckInstance
        .initialize({
          controls: true,
          controlsLayout: 'bottom-right',
          showSlideNumber: 'all',
          center: false
        })
        .then(() => {
          if (slides.length > 0) deckInstance.sync() // Sync Reveal.js with dynamically added slides
        })
    })

    return () => {
      if (deckInstance) deckInstance.destroy() // Cleanup
    }
  }, [slides])

  // Parse content to elements
  useEffect(() => {
    const slidesElements = content.map((slideContent, slideIndex) => {
      return (
        <section key={`slide-${slideIndex}`}>
          {parseContentToElements(slideContent.content || [])}
        </section>
      )
    })
    setSlides(slidesElements[0].props.children)
  }, [])

  // Function to recursively parse content into React elements
  const parseContentToElements = (contentItems) => {
    return contentItems.map((item, index) => {
      switch (item.type) {
        case 'image':
          return (
            <Box sx={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={index}
                src={item.attrs.src}
                alt={item.attrs.alt || ''}
                title={item.attrs.title || ''}
              />
            </Box>
          )
        case 'paragraph':
          return (
            <Typography key={index} variant="body1">
              {item.content ? parseContentToElements(item.content) : ''}
            </Typography>
          )
        case 'bulletList':
          return (
            <List key={index} sx={{ py: 0 }}>
              {item.content ? parseContentToElements(item.content) : ''}
            </List>
          )
        case 'listItem':
          return (
            <ListItem
              key={index}
              style={{ textDecoration: 'none', listStyle: 'none' }}
            >
              {item.content ? parseContentToElements(item.content) : ''}
            </ListItem>
          )
        case 'text':
          return <span key={index}>{item.text}</span>
        default:
          return null
      }
    })
  }

  return (
    <Box className="reveal">
      <Box className="slides">
        <section id="title">
          <Typography
            variant="caption"
            sx={{ position: 'fixed', top: 20, right: 0 }}
          >
            {format(date ? new Date(date) : new Date(), 'P', { locale: de })}
          </Typography>
          <Typography variant="h1" className="content">
            {title}
          </Typography>
        </section>

        {slides.map((slide, idx) => {
          return <section key={'s-' + idx}>{slide}</section>
        })}

        <section id="thanks">
          <Typography variant="h1" className="content">
            Vielen Dank fürs Zuhören
          </Typography>
        </section>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 10, left: 10, zIndex: 10 }}>
        <FullwidthImage
          priority
          src={LogoFull}
          alt="Logo project"
          sx={{ margin: '0 !important' }}
        />
      </Box>
    </Box>
  )
}

export default Presentation
