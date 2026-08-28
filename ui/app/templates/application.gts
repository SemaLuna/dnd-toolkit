import {
  HdsAppFooter,
  HdsAppFrame,
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsAppSideNav,
  HdsAppSideNavPortalTarget,
  HdsAppSideNavPortal,
} from '@hashicorp/design-system-components/components';
import { pageTitle } from 'ember-page-title';
import { default as isActive } from '#helpers/is-active.ts';
import { t } from 'ember-intl';

<template>
  {{pageTitle (t "project.name")}}
  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader>
        <:logo>
          <HdsAppHeaderHomeLink
            @icon="hammer"
            @text={{t "project.name"}}
            @route="index"
            @isIconOnly={{false}}
          />
        </:logo>
      </HdsAppHeader>
    </Frame.Header>
    <Frame.Sidebar>
      <HdsAppSideNav>
        <HdsAppSideNavPortalTarget />
      </HdsAppSideNav>

    </Frame.Sidebar>
    <Frame.Main>
      {{outlet}}
    </Frame.Main>
    <Frame.Footer>
      <HdsAppFooter as |AF|>
        <AF.LegalLinks />
      </HdsAppFooter>
    </Frame.Footer>
  </HdsAppFrame>

  <HdsAppSideNavPortal as |Nav|>
    <Nav.Link
      @text={{t "navigation.home"}}
      @icon="home"
      @route="index"
      @isActive={{isActive "index"}}
    />
    <Nav.Link
      @text={{t "navigation.spell-area"}}
      @icon="wand"
      @route="spell-area-calc"
      @isActive={{isActive "spell-area-calc"}}
    />
  </HdsAppSideNavPortal>
</template>
