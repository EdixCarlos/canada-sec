export const DynamicAsideMenuConfig = {
  items: [
    { section: 'CANADA SEC' },
    {
      title: 'Dashboard',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
      submenu: [
        {
          title: 'Vulnerability Management',
          page: '/dashboard/1',
          translate: 'MENU.DASHBOARD.VM'
        },
        {
          title: 'Advisory',
          page: '/dashboard/2',
          translate: 'MENU.MAINTAINERS.AD'
        },
        {
          title: 'Proyectos',
          page: '/dashboard/3',
          translate: 'MENU.MAINTAINERS.PR'
        },
        {
          title: 'Audits',
          page: '/dashboard/4',
          translate: 'MENU.MAINTAINERS.AU'
        },
      ]
    },
    {
      title: 'MyTickets',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/my-tickets',
      translate: 'MENU.TICKETS',
      bullet: 'dot',
    },
    {
      title: 'Tickets',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/exec-tickets/exec',
      translate: 'MENU.TICKETS_EJECUTOR',
      bullet: 'dot',
    },
    {
      title: 'Maintainers',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/maintainers',
      translate: 'MENU.MAINTAINERS',
      bullet: 'dot',
      submenu: [
        {
          title: 'General',
          page: '/maintainers/mnt-general',
          translate: 'MENU.MAINTAINERS.GENERAL'
        },
        {
          title: 'Formularios Dinamicos',
          page: '/maintainers/mnt-udf',
          translate: 'MENU.MAINTAINERS.UDF'
        },
        {
          title: 'Servicios',
          page: '/maintainers/mnt-services',
          translate: 'MENU.MAINTAINERS.SERVICES'
        },
        {
          title: 'SLA',
          page: '/maintainers/mnt-sla',
          translate: 'MENU.MAINTAINERS.SLA'
        },
        {
          title: 'Aplicación',
          page: '/maintainers/mnt-app',
          translate: 'MENU.MAINTAINERS.APP'
        },
        {
          title: 'Requesters',
          page: '/maintainers/mnt-req',
          translate: 'MENU.MAINTAINERS.REQUESTERS'
        },
        {
          title: 'Relaciones',
          page: '/maintainers/mnt-relations',
          translate: 'MENU.MAINTAINERS.RELATIONS'
        }
      ]
    }
  ]
};
