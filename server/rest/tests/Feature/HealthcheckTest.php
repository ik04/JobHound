<?php

it('healthcheck endpoint is running', function () {
    $response = $this->get('/v1/healthcheck');

    $response->assertStatus(200);
});
