<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorCollection;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorsController extends Controller
{
    public function getListAction()
    {
        return new ColorCollection(Color::all());
    }

    public function getOneAction($id)
    {
        return new ColorResource(Color::findOrFail($id));
    }

    public function createAction(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'hex_value' => ['required', 'unique:colors', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
        ]);

        $model = new Color();
        $model->name = $request->name;
        $model->hex_value = $request->hex_value;
        $model->save();

        return response($model, 201, [
            'Location' => route('api.colors.one', ['id' => $model->id])
        ]);
    }

    public function deleteAction($id)
    {
        Color::findOrFail($id)->delete();

        return response('Deleted Successfully', 200);
    }
}
