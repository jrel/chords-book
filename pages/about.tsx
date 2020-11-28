import React from 'react'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import { useRouter } from 'next/router'

export default function About() {
  const router = useRouter()

  return (
    <div onClick={() => router.back()}>
      <Typography variant="h6">Back</Typography>
    </div>
  )
}
