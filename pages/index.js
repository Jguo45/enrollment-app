import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Table } from '@mantine/core'

export default function Home() {
  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ]

  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ))
  return (
    <Table striped>
      <thead className={styles.table_header}>
        <th>Element position</th>
        <th>Element name</th>
        <th>Symbol</th>
        <th>Atomic mass</th>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
