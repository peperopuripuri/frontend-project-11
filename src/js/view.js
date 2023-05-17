import onChange from 'on-change';
import state from './model';
import { post } from 'jquery';

const dangerText = document.querySelector('.text-danger');
const posts = document.querySelector('.posts');
const feeds = document.querySelector('.feeds');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-body');
const modalLink = document.querySelector('.full-article');
export const input = document.querySelector('#url-input');
export const urls = new Array();

const render = () => {
    if (state.urlForm.status === 'here') {
        if (urls.length > 1) urls.splice(0, 1);
        dangerText.innerHTML = state.urlForm.translation;
        dangerText.removeAttribute('style');
        input.classList.add('is-invalid');
    } else if (state.urlForm.status === 'correct') {
        input.value = '';
        input.classList.remove('is-invalid');
        dangerText.setAttribute('style', 'color: green !important');
        dangerText.innerHTML = state.urlForm.translation;
        posts.innerHTML = `
            <div class="card border-0">
                <div class="card-body">
                    <h2 class="card-title h4">Посты</h2>
            </div>
        `;
        for (let i = 0; i < state.receivedData.post.name.length; i++) {
            const postId = state.receivedData.post.id[i].textContent;
            posts.innerHTML += `
              <ul class="list-group border-0 rounded-0">
                <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                  <a href="${state.receivedData.post.link[i].textContent}" class="fw-bold" data-id="${postId}" target="_blank" rel="noopener noreferrer">${state.receivedData.post.name[i].textContent}</a>
                  <button type="button" class="btn btn-outline-primary btn-sm" data-id="${postId}" data-bs-toggle="modal" data-bs-target="#modal-${postId}">Просмотр</button>
                </li>
              </ul>
              <div class="modal fade" id="modal-${postId}" tabindex="-1" aria-labelledby="modal-${postId}-label" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="modal-${postId}-label">${state.receivedData.post.name[i].textContent}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ${state.receivedData.post.description[i].textContent}
                    </div>
                    <div class="modal-footer">
                      <a href="${state.receivedData.post.link[i].textContent}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Перейти</a>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                  </div>
                </div>
              </div>
            `;
        };
        feeds.innerHTML = `
            <div class="card border-0">
                <div clas="card-body">
                    <h2 class="card-title h4">Фиды</h2>
                </div>
            </div>
            <ul class="list-group border-0 rounded-0">
                <li class="list-group-item border-0 border-end-0">
                    <h3 class="h6 m-0">${state.receivedData.title}</h3>
                    <p class="m-0 small text-black-50">${state.receivedData.description}</p>
                </li>
            </ul>
        `;
        urls.push(state.urlForm.url);
    } else if (state.urlForm.status === 'error') {
        dangerText.removeAttribute('style');
        input.classList.add('is-invalid');
        dangerText.innerHTML = state.urlForm.translation;
    }
};

export default onChange(state, render);