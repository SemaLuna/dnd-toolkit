FROM ghcr.io/pnpm/pnpm:11.25.0

# Add a non-root user
ARG USERNAME=pnpm
ARG USER_ID=1000
ARG GROUPNAME=pnpm
ARG GROUP_ID=1000
ARG HOME_DIR=/home/pnpm

RUN groupadd --gid ${GROUP_ID} ${GROUPNAME}
RUN useradd --uid ${USER_ID} --gid ${GROUP_ID} ${USERNAME} -d ${HOME_DIR} --create-home --shell /bin/bash

USER ${USERNAME}
RUN mkdir ${HOME_DIR}/store
RUN mkdir ${HOME_DIR}/global
RUN mkdir ${HOME_DIR}/bin
RUN pnpm config set store-dir ${HOME_DIR}/store --global
ENV PATH="${HOME_DIR}/bin:${PATH}"
