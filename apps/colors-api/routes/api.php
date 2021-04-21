<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'api/v1'], function () use ($router) {
    $router->get('colors', ['as' => 'api.colors.list', 'uses' => 'ColorsController@getListAction']);
    $router->get('colors/{id}', ['as' => 'api.colors.one', 'uses' => 'ColorsController@getOneAction']);
    $router->post('colors', ['as' => 'api.colors.create', 'uses' => 'ColorsController@createAction']);
    $router->delete('colors/{id}', ['as' => 'api.colors.delete', 'uses' => 'ColorsController@deleteAction']);
});
