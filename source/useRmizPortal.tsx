let rmizPortalEl: HTMLDivElement

export interface UseRmizPortal {
  (): HTMLDivElement
}

const useRmizPortal: UseRmizPortal = () => {
  if (!rmizPortalEl) {
    rmizPortalEl = document.createElement('div')
    rmizPortalEl.setAttribute('data-rmiz-portal', 'true')
    document.body.appendChild(rmizPortalEl)
  }

  return rmizPortalEl
}

export default useRmizPortal
