package pxc.apps.reeviewer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pxc.apps.reeviewer.exceptions.AbstractCustomException;
import pxc.apps.reeviewer.exceptions.CustomForbiddenException;
import pxc.apps.reeviewer.exceptions.CustomNotFoundException;
import pxc.apps.reeviewer.model.REEntry;
import pxc.apps.reeviewer.service.REEService;

import java.util.Base64;
import java.util.List;

import static java.lang.System.currentTimeMillis;

/**
 * Created by iowp01 on 20.07.2016.
 */
@RestController
@RequestMapping("/pxc/ree/admin")
public class REEAdminController {

    @Autowired
    REEService reeService;

    public REEAdminController() {
    }

    public REEAdminController(REEService reeService) {
        this.reeService = reeService;
    }

    @RequestMapping(value = "/alive/{timestamp}", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.GET)
    String alive(@PathVariable(value = "timestamp") Long timestamp) throws AbstractCustomException {
        return "response took " + (currentTimeMillis() - timestamp);
    }


    @RequestMapping(value = "/purge", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.GET)
    ResponseEntity<String> purge(@RequestParam(value = "secret") String secret) throws AbstractCustomException {
        if(secret.equals("RjFJc1RvdGFsbHlTaGl0ZSE=")){
            reeService.purge();
            return new ResponseEntity<>("succesful", HttpStatus.OK);
        }
        return new ResponseEntity<>("error occurred", HttpStatus.UNAUTHORIZED);
    }

}
