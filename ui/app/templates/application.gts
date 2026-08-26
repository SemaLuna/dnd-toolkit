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

<template>
  {{pageTitle "DND Toolkit"}}
  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader>
        <:logo>
          <HdsAppHeaderHomeLink
            @icon="hammer"
            @text="DND Toolkit"
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
      @text="Home"
      @icon="home"
      @route="index"
      @isActive={{isActive "index"}}
    />
    <Nav.Link
      @text="Spell Area Calculator"
      @icon="wand"
      @route="spell-area-calc"
      @isActive={{isActive "spell-area-calc"}}
    />
  </HdsAppSideNavPortal>
</template>
