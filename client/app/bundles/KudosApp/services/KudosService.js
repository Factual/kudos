import request from 'axios'
import { isEmpty } from 'lodash'
import { Kudo } from '../models'

const PAGE_LIMIT = 10

// TODO: API call should not rely on the tab!
export async function getKudos(tab, cursorTime) {
  const resp = await request({
    method: 'GET',
    url: '/kudos',
    responseType: 'json',
    params: {
      limit: PAGE_LIMIT,
      tab,
      cursor_time: cursorTime,
    },
  })

  return {
    kudos: isEmpty(resp.data.kudos) ? [] : resp.data.kudos.map(kudo => new Kudo(kudo)),
    total: resp.data.total,
  }
}

export async function postKudo(receiverEmails, body) {
  const resp = await request({
    method: 'POST',
    url: '/kudos.json',
    responseType: 'json',
    data: {
      kudo: {
        receiver_emails: receiverEmails,
        body,
      },
    },
  })

  return new Kudo(resp.data.kudo)
}

export async function patchKudo(id, body) {
  const resp = await request({
    method: 'PATCH',
    url: `/kudos/${id}`,
    responseType: 'json',
    data: {
      kudo: {
        id,
        body,
      },
    },
  })

  return new Kudo(resp.data.kudo)
}

export async function postLike(id) {
  const resp = await request({
    method: 'POST',
    url: 'like',
    responseType: 'json',
    data: {
      kudo_id: id,
    },
  })

  return resp.data.like
}

export async function postUnlike(id) {
  const resp = await request({
    method: 'POST',
    url: 'unlike',
    responseType: 'json',
    data: {
      kudo_id: id,
    },
  })

  return resp.data.deleted
}
